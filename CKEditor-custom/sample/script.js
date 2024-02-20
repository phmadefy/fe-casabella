const { Base64UploadAdapter } = require("@ckeditor/ckeditor5-upload");

ClassicEditor.create(document.querySelector(".editor"), {
  // Editor configuration.
  // plugins: [Base64UploadAdapter],
})
  .then((editor) => {
    window.editor = editor;
  })
  .catch(handleSampleError);

function handleSampleError(error) {
  const issueUrl = "https://github.com/ckeditor/ckeditor5/issues";

  const message = [
    "Oops, something went wrong!",
    `Please, report the following error on ${issueUrl} with the build id "gp1tsfi7f89g-t3op7squ5xwe" and the error stack trace:`,
  ].join("\n");

  console.error(message);
  console.error(error);
}
