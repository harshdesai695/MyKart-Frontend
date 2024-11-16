import base64
import json
import os

def convert_images_to_base64(directory, output_json):
    # Dictionary to store image data
    image_data = {}
    
    # Iterate through all files in the directory
    for filename in os.listdir(directory):
        # Full path of file
        file_path = os.path.join(directory, filename)
        
        # Check if it's an image file (you can customize extensions as needed)
        if os.path.isfile(file_path) and filename.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.bmp')):
            # Open the image file in binary mode
            with open(file_path, 'rb') as image_file:
                # Encode the image to base64
                encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
                
                # Store in dictionary with filename as key
                image_data[filename] = encoded_string
    
    # Write the dictionary to a JSON file
    with open(output_json, 'w') as json_file:
        json.dump(image_data, json_file, indent=4)

    print(f"Images have been converted and stored in {output_json}")

# Set the directory containing images and output JSON filename
image_directory = os.getcwd()
output_json_file = 'images_base64.json'

# Run the conversion function
convert_images_to_base64(image_directory, output_json_file)