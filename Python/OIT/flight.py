import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

df = pd.read_excel("flightdata.xlsx")
df.head()

# Map invalid 'DAY_OF_WEEK' values to correct ones
day_of_week_mapping = {"WEDS": 3, 12: 1, 10: 2}
df["DAY_OF_WEEK"] = df["DAY_OF_WEEK"].replace(day_of_week_mapping)


# Drop rows with NaN in 'DAY_OF_WEEK' column
df_cleaned = df.dropna(subset=["DAY_OF_WEEK"])
df_cleaned["SCHEDULED DEPARTURE_TIME"] = pd.to_datetime(
    df_cleaned["SCHEDULED DEPARTURE_TIME"]
)
df_cleaned["SCHEDULED ARRIVAL_TIME"] = pd.to_datetime(
    df_cleaned["SCHEDULED ARRIVAL_TIME"]
)
df_cleaned["ACTUAL ARRIVAL_TIME"] = pd.to_datetime(df_cleaned["ACTUAL ARRIVAL_TIME"])


# Plot average delay by day of the week
sns.barplot(x="DAY_OF_WEEK", y="ARRIVAL_DELAY In Minutes", data=df_cleaned)
plt.title("Average Arrival Delay by Day of Week")
plt.show()
