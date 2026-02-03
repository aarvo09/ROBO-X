from PIL import Image
import sys

def remove_white_bg(input_path, output_path):
    img = Image.open(input_path)
    img = img.convert("RGBA")
    datas = img.getdata()

    newData = []
    for item in datas:
        # Change all white (also shades of whites)
        # to transparent
        if item[0] > 220 and item[1] > 220 and item[2] > 220:
            newData.append((255, 255, 255, 0))
        else:
            newData.append(item)

    img.putdata(newData)
    img.save(output_path, "PNG")
    print(f"Processed {input_path} to {output_path}")

if __name__ == "__main__":
    # remove_white_bg("static/images/robot_raw.png", "static/images/robot_transparent.png")
    # remove_white_bg("static/images/charging_station_raw.png", "static/images/charging_station.png") # Old one
    # remove_white_bg("static/images/guidrobo.png", "static/images/guidrobo_transparent.png")
    # remove_white_bg("static/images/charging_station_cushion.png", "static/images/charging_station_cushion_transparent.png")
    remove_white_bg("static/images/robox_mascot_raw.png", "static/images/robox_mascot.png")
