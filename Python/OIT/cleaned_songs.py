import pandas as pd
import numpy as np
import re

# Step 1: Load the CSV file
df = pd.read_csv("3.1.6-songs-1.csv")

# Step 2: Convert date strings to datetime objects, then extract year
df["year"] = pd.to_datetime(df["Reached number 1"]).dt.year


# Step 3: Clean up artist names
def clean_artist(artist):
    return artist.replace(",", " &") if isinstance(artist, str) else artist


df["artist"] = df["Artist"].apply(clean_artist)


# Step 4: Separate main artist from supporting artists
def split_artists(artist):
    if isinstance(artist, str) and ("&" in artist or " and " in artist.lower()):
        parts = re.split(r"\s*(?:&|and)\s+", artist, flags=re.IGNORECASE)
        return parts[0], " & ".join(parts[1:])
    return artist, np.nan


df[["main_artist", "supporting_artist"]] = df["artist"].apply(
    lambda x: pd.Series(split_artists(x))
)


# Step 5: Clean up song titles (remove year artifacts)
def clean_title(title):
    return re.sub(r"\s*\(\d{4}\)\s*$", "", title) if isinstance(title, str) else title


df["single"] = df["Single"].apply(clean_title)

# Step 6: Standardize label names
label_mapping = {
    "Warner Brothers": "Warner Bros.",
    # Add more mappings as needed
}
df["label"] = df["Label"].replace(label_mapping)


# Step 7: Separate primary and secondary labels using "/"
def split_labels(label):
    if isinstance(label, str) and "/" in label:
        parts = label.split("/")
        return parts[0].strip(), " & ".join([part.strip() for part in parts[1:]])
    return label, np.nan


df[["label_primary", "label_secondary"]] = df["label"].apply(
    lambda x: pd.Series(split_labels(x))
)

# Step 8: Replace all empty cells, empty strings, and NaN values with 'N/A'
df = df.replace(["", np.nan], "N/A")

# Additional step: Replace entire empty rows with 'N/A'
df = df.apply(
    lambda x: x if x.notna().any() else pd.Series("N/A", index=x.index), axis=1
)

# Step 9: Rename "Weeks at number 1" to "weeks_at_no_1"
df = df.rename(columns={"Weeks at number 1": "weeks_at_no_1"})

# Step 10: Ensure all column names are in lowercase
df.columns = df.columns.str.lower()

# Step 11: Reorder columns
df = df[
    [
        "id",
        "year",
        "main_artist",
        "supporting_artist",
        "single",
        "label_primary",
        "label_secondary",
        "weeks_at_no_1",
    ]
]

# Step 12: Save the cleaned data to a new CSV file
df.to_csv("festus_cleaned_songs.csv", index=False)

# Print the first few rows to verify the changes
print(df.head())

# Print info about the dataset to check for any remaining null values
print(df.info())
