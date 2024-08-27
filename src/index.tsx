import { Hono } from 'hono';

// Create a new Hono app
const app = new Hono();

function getSuffix () {
  let suffix = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const charactersLength = characters.length;
  for (let i = 0; i < 4; i++) {
    suffix += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return suffix;
}

// Serve the main page
app.get('/', (c) => {
  const thisYear = new Date().getFullYear();
  const prefix = "P" + thisYear;
  const startSuffix = getSuffix();
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Project ID Creator</title>
      <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
      <script src="https://kit.fontawesome.com/e16e47a921.js" crossorigin="anonymous"></script>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>
    </head>
    <body class="flex items-center justify-center h-screen bg-white">
      <div id="call-to-action" class="absolute top-64 text-center text-xl font-bold text-green-800 w-96">
        Enter a three-character set of initials, then click the copy button...
      </div>
      <div id="pill" class="flex space-x-4 bg-green-500 pl-4 pr-2 py-2 rounded-full shadow-xl w-128">
        <div id="prefixDiv" class="flex items-center justify-center text-white text-lg font-bold rounded-full py-2">
            ${prefix}
        </div>
        <div class="flex items-center justify-center text-white text-lg font-bold antialiased">-</div>
        <form class="flex items-center justify-center rounded-full py-2">
            <input 
                id="initials" 
                type="text" 
                class="bg-white text-black text-center text-lg font-bold antialiased py-2 rounded-full outline-none ring-0 focus:ring focus:ring-green-600 focus:outline-none" 
                pattern="([A-Za-z]{3}|[A-Za-z]{2}[0-9])"
                maxlength="3" 
                required 
                data-1p-ignore 
                placeholder="enter initials e.g. CRD"
            >
        </form>
        <div class="flex items-center justify-center text-white text-lg font-bold antialiased">-</div>
        <div id="suffixDiv" class="flex items-center justify-center text-white text-lg font-bold antialiased rounded-full py-2 w-12">
            ${startSuffix}
        </div>

        <button id="refreshIcon" class="flex items-center justify-center text-white text-lg font-bold antialiased rounded-full py-2 w-4">
            <i class="fa-solid fa-rotate-right"></i>
        </button>

        <button id="copyButton" class="flex items-center justify-center bg-green-600 text-white text-lg font-bold antialiased rounded-full p-2 w-16" title="Click to copy ID">
            <i id="copyIcon" class="fa-solid fa-copy"></i>
        </button>
      </div>
      <script>
        const initials = document.getElementById('initials');

        function refreshSuffix() {
          const suffix = ${getSuffix.toString()};
          suffixDiv.textContent = suffix();
        }

        document.getElementById('refreshIcon').addEventListener('click', refreshSuffix);

        initials.addEventListener('input', function() {
            initials.value = initials.value.toUpperCase();
            refreshSuffix()
            if (initials.value === '') {
                initials.classList.remove('bg-green-200', 'bg-red-200');
                initials.classList.add('bg-white');
            } else if (initials.validity.valid) {
                initials.classList.remove('bg-red-200', 'bg-white');
                initials.classList.add('bg-green-200');
            } else {
                initials.classList.remove('bg-green-200', 'bg-white');
                initials.classList.add('bg-red-200');
            }
        });

        function copyProjectID() {
            const prefixText = document.getElementById('prefixDiv').textContent.trim();
            const initialsText = initials.value.toUpperCase().trim();
            const suffixText = document.getElementById('suffixDiv').textContent.trim();
            const projectID = prefixText + "-" + initialsText + "-" + suffixText;
            const copyIcon = document.getElementById('copyIcon');
            const pill = document.getElementById('pill');
            if (initials.validity.valid) {
              navigator.clipboard.writeText(projectID)
                  .then(() => {
                      copyIcon.classList.remove('fa-copy');
                      copyIcon.classList.add('fa-check', 'text-green-800');
                      copyButton.classList.remove('bg-green-600');
                      copyButton.classList.add('bg-green-200');
                      setTimeout(() => {
                            copyIcon.classList.remove('fa-check', 'text-green-800');
                            copyIcon.classList.add('fa-copy');
                            copyButton.classList.remove('bg-green-200');
                            copyButton.classList.add('bg-green-600');
                        }, 500);
                  })
                  .catch(err => {
                      console.error('Error copying text: ', err);
                  });
            } else {
              copyIcon.classList.remove('fa-copy');
              copyButton.classList.remove('bg-green-600');
              copyButton.classList.add('bg-red-200');
              copyIcon.classList.add('fa-xmark', 'text-red-800');
              pill.classList.add('animate__animated', 'animate__headShake');
              setTimeout(() => {
                  copyIcon.classList.remove('fa-xmark', 'text-red-800');
                  copyButton.classList.remove('bg-red-200');
                  copyButton.classList.add('bg-green-600');
                  copyIcon.classList.add('fa-copy');
                  pill.classList.remove('animate__animated', 'animate__headShake');
              }, 500);
            }
        }

        document.getElementById('copyButton').addEventListener('click', copyProjectID);
      </script>
    </body>
    </html>
  `);
});

export default app;
