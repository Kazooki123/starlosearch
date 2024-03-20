import os

from transformers import AutoTokenizer, AutoModelForCausalLM

# Set the HF_HOME environment variable
os.environ["HF_HOME"] = "D://huggingface"

custom_cache_dir = "D://huggingface_cache"


tokenizer = AutoTokenizer.from_pretrained("gpt2")
model = AutoModelForCausalLM.from_pretrained("gpt2")


# Function to generate text based on a given prompt
def generate_text(prompt):
    input_ids = tokenizer.encode(prompt, return_tensors="pt")
    output = model.generate(
        input_ids,
        max_length=1024,
        do_sample=True,
        top_k=50,
        top_p=0.95,
        num_return_sequences=1,
    )
    generated_text = tokenizer.decode(output[0], skip_special_tokens=True)
    return generated_text
