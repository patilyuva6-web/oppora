import re

# Read your Oppora dashboard HTML
with open('public/dashboard/index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Find JavaScript section
script_start = content.find('<script>')
script_end = content.find('</script>')

if script_start == -1 or script_end == -1:
    print('ERROR: <script>...</script> not found.')
    exit()

js = content[script_start + len('<script>'):script_end]

# Find IDs used by JavaScript
ids_used = re.findall(
    r'document\.getElementById\(["\']([a-zA-Z0-9_-]+)["\']\)',
    js
)

# Find IDs defined in HTML
ids_in_html = set(
    re.findall(
        r'id=["\']([a-zA-Z0-9_-]+)["\']',
        content[:script_start]
    )
)

# Find missing IDs
missing_ids = set()

for id_name in set(ids_used):
    if id_name not in ids_in_html:
        missing_ids.add(id_name)

print('IDs used in JS:', len(set(ids_used)))
print('IDs defined in HTML:', len(ids_in_html))

if missing_ids:
    print('\nMissing IDs in HTML:')
    for id_name in sorted(missing_ids):
        print('-', id_name)
else:
    print('\nALL IDs IN JAVASCRIPT EXIST IN HTML! PERFECT!')