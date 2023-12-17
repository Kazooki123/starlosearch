# Import the necessary modules
import torch
import torchvision
import torchvision.transforms as transforms
import os

# Define the image transformations
transform = transforms.Compose(
    [transforms.Resize((224, 224)), # resize the images to 224 x 224 pixels
     transforms.ToTensor(), # convert the images to tensors
     transforms.Normalize((0.485, 0.456, 0.406), (0.229, 0.224, 0.225))]) # normalize the images using the mean and standard deviation of the ImageNet dataset

# Create a model object
model = torchvision.models.resnet50()

# Load the state_dict from the file
state_dict = torch.load("resnet50-0676ba61.pth")

# Load the state_dict into the model object
model.load_state_dict(state_dict)

# Set the model to evaluation mode
model.eval()

# Define the classes
classes = ("nsfw", "sfw")

# Load the test images from the folder
test_images = os.listdir("test") # get the names of the images in the test folder
for image in test_images: # loop over the images
    img = torchvision.io.read_image(os.path.join("test", image)) # read the image as a tensor
    img = transforms.functional.to_pil_image(img) # convert the tensor to a PIL image
    img = transform(img) # apply the image transformations
    img = transforms.ToTensor()(img) # convert the PIL image to a tensor
    img = img.unsqueeze(0) # add a batch dimension
    output = model(img) # pass the image through the model
    _, predicted = torch.max(output, 1) # get the index of the predicted class
    print(f"{image}: {classes[predicted]}") # print the image name and the predicted class
