const { Router } = require('express')
const router = Router()

const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage })
const AdmZip = require('adm-zip')

router.post('/filters/zip', upload.single('file'), (req, res) => {
  const zip = new AdmZip(req.file.buffer)
  const zipEntries = zip.getEntries()
  const newZip = { files: zipEntries }
  console.log(newZip.files)
  res.json({ files: newZip })
  console.log(zipEntries)
})
export default router
