import pandas as pd
import re

def process_row(row):
    # If the row is empty or contains only whitespace, return it as is
    if pd.isna(row) or str(row).strip() == '' or row == 'kk':
        return row
    
    # Extract numbers using regex
    pattern = r'intimate: (\d+); moderate: (\d+); strong: (\d+); enormous: (\d+)'
    match = re.match(pattern, str(row))
    
    # If pattern doesn't match, return the original row
    if not match:
        return row
    
    # Convert to integers
    numbers = [int(x) for x in match.groups()]
    total = sum(numbers)
    
    # Handle case where total is 0
    if total == 0:
        return 'very weak: 0%; weak: 0%; moderate: 0%; long lasting: 0%; eternal: 0%'
    
    # Calculate percentages
    percentages = [round((num / total) * 100) for num in numbers]
    
    # Ensure percentages sum to 100%
    diff = 100 - sum(percentages)
    if diff != 0:
        percentages[-1] += diff
    
    # Format the result
    return f'very weak: {percentages[0]}%; intimate: {percentages[1]}%; strong: {percentages[2]}%; enormous: {percentages[3]}%'

# Read the original CSV file
df = pd.read_csv('scrapper/longevity_sillage.csv')

# Process each row
df['Sillage'] = df['Sillage'].apply(process_row)

# Save to new CSV file
df.to_csv('scrapper/longevity_sillage_percentages.csv', index=False)