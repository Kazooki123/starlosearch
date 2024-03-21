from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline

# Load the GPT-2 model and tokenizer
tokenizer = AutoTokenizer.from_pretrained("gpt2")
model = AutoModelForCausalLM.from_pretrained("gpt2")

# Load the pipelines for question answering and sentiment analysis
qa_pipeline = pipeline(
    "question-answering", model="distilbert-base-cased-distilled-squad"
)
sentiment_pipeline = pipeline(
    "text-classification", model="distilbert-base-uncased-finetuned-sst-2-english"
)


def generate_text(prompt):
    input_ids = tokenizer.encode(prompt, return_tensors="pt")

    # Generate text with repetition penalty to reduce repetitive sentences
    output = model.generate(
        input_ids,
        max_length=1024,
        do_sample=True,
        top_k=50,
        top_p=0.95,
        num_return_sequences=1,
        repetition_penalty=2.0,
    )
    generated_text = tokenizer.decode(output[0], skip_special_tokens=True)

    # Check if the prompt is a question and answer it
    if "?" in prompt:
        question = prompt.strip("?")
        answer = qa_pipeline(question=question, context=generated_text)["answer"]
        generated_text += f"\nAnswer: {answer}"

    # Analyze the sentiment of the generated text
    sentiment = sentiment_pipeline(generated_text)[0]["label"]
    generated_text += f"\nSentiment: {sentiment}"

    return generated_text
