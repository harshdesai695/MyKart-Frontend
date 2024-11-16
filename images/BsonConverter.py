import bson
from PIL import Image
import os

def image_to_bson(image_path, output_file):
  """Converts an image to BSON format.

  Args:
    image_path: Path to the image file.
    output_file: Path to the output BSON file.
  """

  with open(image_path, 'rb') as f:
    image_data = f.read()

  # Create a BSON document with the image data
  bson_data = bson.encode_binary(image_data)
  bson_doc = {'image': bson_data}

  # Write the BSON document to a file
  with open(output_file, 'wb') as f:
    f.write(bson.dumps(bson_doc))

# Example usage:
image_path = os.getcwd()+'\images'+'\Ant_Esports_Gp400.jpg'
output_file = 'image.bson'
image_to_bson(image_path, output_file)