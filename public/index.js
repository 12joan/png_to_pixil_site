const form = document.querySelector('#form')
const fileTarget = document.querySelector('#file-target')
const fileInput = document.querySelector('#file')
const output = document.querySelector('#output')

const handleFileSelected = () => {
  document.querySelector('form').submit()

  const notice = document.createElement('div')
  notice.className = 'bg-green-300 rounded-lg p-4 transition-colors duration-1000'
  notice.setAttribute('aria-live', 'polite')
  notice.innerText = `Converted and downloaded ${fileInput.files[0].name}`
  output.prepend(notice)

  setTimeout(() => {
    notice.classList.remove('bg-green-300')
    notice.classList.add('bg-green-100')
  }, 1000)
}

fileTarget.addEventListener('click', () => fileInput.click())

fileTarget.addEventListener('dragover', event => event.preventDefault())

fileTarget.addEventListener('dragenter', event => {
  fileTarget.classList.add('bg-blue-100')
})

fileTarget.addEventListener('dragleave', event => {
  fileTarget.classList.remove('bg-blue-100')
})

fileTarget.addEventListener('drop', event => {
  event.preventDefault()

  fileTarget.classList.remove('bg-blue-100')

  const file = event.dataTransfer.files[0]

  if (file && file.type === 'image/png') {
    const dataTransfer = new DataTransfer()
    dataTransfer.items.add(file)
    fileInput.files = dataTransfer.files
    handleFileSelected()
  } else alert('Please drop a PNG file')
})

fileInput.addEventListener('change', handleFileSelected)
