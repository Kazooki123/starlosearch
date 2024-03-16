from transformers import GPT2LMHeadModel, GPT2Tokenizer
import os

# Set the HF_HOME environment variable
os.environ['HF_HOME'] = 'D://huggingface'

custom_cache_dir = 'D://huggingface_cache'


# Function to generate text based on a given prompt
def generate_text(prompt):
    # Load pre-trained model tokenizer (vocabulary)
    tokenizer = GPT2Tokenizer.from_pretrained('gpt2', cache_dir=custom_cache_dir)

    # Load pre-trained model (weights)
    model = GPT2LMHeadModel.from_pretrained('gpt2', cache_dir=custom_cache_dir)

    # Encode the prompt text to be used as context for generation
    input_ids = tokenizer.encode(prompt, return_tensors='pt')

    # Generate text until the output length (which includes the context length) reaches 50 tokens
    output = model.generate(input_ids, max_length=100)

    # Decode the generated tokens to get the generated text
    generated_text = tokenizer.decode(output[0], skip_special_tokens=True)

    return generated_text
