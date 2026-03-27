import os

folder = r"E:\College_Project\Parjanya_The_Cloud\Frontend\src\assets\seq2"

files = sorted(os.listdir(folder))

for i, file in enumerate(files):
    ext = os.path.splitext(file)[1]
    new_name = f"frame_{str(i+1).zfill(4)}{ext}"
    os.rename(
        os.path.join(folder, file),
        os.path.join(folder, new_name)
    )

print("Seq2 Renamed ✅")