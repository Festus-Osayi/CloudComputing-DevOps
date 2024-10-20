# Import necessary libraries
import pandas as pd
import matplotlib.pyplot as plt

# Step 1: Load the CSV file
# Replace 'your_file_path.csv' with the actual path to your CSV file
file_path = "Average-height-weight-1.csv"
data = pd.read_csv(file_path)

# Step 2: Extract height and weight data
height = data['AVERAGE of Height']
weight = data['AVERAGE of Weight']

# Step 3: Create the scatter plot
plt.figure(figsize=(8, 6))  # Set the figure size
plt.scatter(height, weight, color='#B59787', alpha=0.6)  # Plot height vs weight

# Step 4: Customize the chart
plt.title(
    "Female Olympic Athletes: Average Height vs. Average Weight of (1896-2018)",
    fontsize=14,
)  # Add a title
plt.xlabel("Average Height (cm)", fontsize=12)  # X-axis label
plt.ylabel("Average Weight (kg)", fontsize=12)  # Y-axis label

# Add gridlines for better readability
plt.grid(True)
plt.arrow(
    175,
    70,
    0,
    10,
    head_width=2,
    head_length=2,
    fc="black",
    ec="black",
)  # Add an arrow to highlight
plt.text(176, 75, "Athletes with height > 175cm", fontsize=12, color="black")  # Add a text label

# Step 5: Display the chart
plt.show()
