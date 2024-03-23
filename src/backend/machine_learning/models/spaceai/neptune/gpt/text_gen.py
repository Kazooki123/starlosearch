from transformers import AutoTokenizer, AutoModelForCausalLM

# Loading the GPT-Neo model and tokenizer
model_name = "mistralai/Mistral-7B-Instruct-v0.2"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)


def generate_text(prompt):
    input_ids = tokenizer.encode(prompt, return_tensors="pt")

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

    if "?" in prompt:
        pass

    return generated_text
