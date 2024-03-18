# TRAINING MACHINE LEARNING LIBRARIES AND MAKE A DATASET OF IT

import os

# Import the necessary modules
import torch
import torch.nn as nn
import torch.optim as optim
import torchvision
import torchvision.transforms as transforms

root = os.path.abspath("vision")

# Define the hyperparameters
batch_size = 2  # number of images per batch
num_epochs = 10  # number of epochs to train the model
learning_rate = 0.01  # learning rate for the optimizer

# Define the image transformations
transform = transforms.Compose(
    [
        transforms.Resize((224, 224)),  # resize the images to 224 x 224 pixels
        transforms.ToTensor(),  # convert the images to tensors
        transforms.Normalize((0.485, 0.456, 0.406), (0.229, 0.224, 0.225)),
    ]
)  # normalize the images using the mean and standard deviation of the ImageNet dataset

# Load the images from the folders
trainset = torchvision.datasets.ImageFolder(root=root, transform=transform)
trainloader = torch.utils.data.DataLoader(trainset, batch_size=batch_size, shuffle=True)

# Define the classes
classes = ("nsfw", "sfw")

# Load the pre-trained ResNet50 model
model = torchvision.models.resnet50(pretrained=True, progress=True)

# Freeze the parameters of the model except the last layer
for param in model.parameters():
    param.requires_grad = False
model.fc = nn.Linear(
    model.fc.in_features, 2
)  # replace the last layer with a new one that has two outputs

# Define the loss function and the optimizer
criterion = nn.CrossEntropyLoss()  # use cross entropy loss for classification
optimizer = optim.SGD(
    model.fc.parameters(), lr=learning_rate, momentum=0.9
)  # use stochastic gradient descent with momentum for optimization

# Train the model
for epoch in range(num_epochs):  # loop over the dataset multiple times
    running_loss = 0.0
    for i, data in enumerate(trainloader, 0):
        # get the inputs
        inputs, labels = data

        # zero the parameter gradients
        optimizer.zero_grad()

        # forward + backward + optimize
        outputs = model(inputs)  # pass the inputs through the model
        loss = criterion(outputs, labels)  # compute the loss
        loss.backward()  # perform backpropagation
        optimizer.step()  # update the parameters

        # print statistics
        running_loss += loss.item()
        if i % batch_size == batch_size - 1:  # print every batch
            print(
                "[%d, %5d] loss: %.3f" % (epoch + 1, i + 1, running_loss / batch_size)
            )
            running_loss = 0.0

print("Finished Training")
