const fs = require('fs');

const content = fs.readFileSync('oppora/index.html', 'utf8');

const scriptStart = content.indexOf('<script>');
const scriptEnd = content.indexOf('</script>');

const js = content.substring(scriptStart + 8, scriptEnd);

fs.writeFileSync('temp_script.js', js, 'utf8');

console.log('temp_script.js extracted, length:', js.length);