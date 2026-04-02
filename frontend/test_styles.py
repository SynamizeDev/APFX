import os
import re

directory = r"d:\desktop\apfx11\frontend"
count = 0

pattern1 = re.compile(r"rgba\(\s*255\s*,\s*255\s*,\s*255\s*,\s*0\.0[234]\s*\)")
pattern2 = re.compile(r"rgba\(\s*11\s*,\s*15\s*,\s*26\s*,\s*0\.[0-9]+\s*\)")
pattern3 = re.compile(r"rgba\(\s*6\s*,\s*10\s*,\s*18\s*,\s*0\.[0-9]+\s*\)")
pattern4 = re.compile(r"rgba\(\s*255\s*,\s*255\s*,\s*255\s*,\s*0\.0[56789]\s*\)")

for root, _, files in os.walk(directory):
    for file in files:
        if file.endswith(".module.css"):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            matches = pattern1.findall(content) + pattern2.findall(content) + pattern3.findall(content) + pattern4.findall(content)
            if matches:
                print(f"File: {filepath} - {len(matches)} matches")
                # for m in matches:
                #    print("  ", m)
                count += len(matches)

print(f"Total occurrences: {count}")
