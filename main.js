
window.addEventListener("load", async () => {

    const parts = [];

    await navigator.mediaDevices.getUserMedia({audio: true, video: true})
    .then(stream => {

        document.getElementById("video").srcObject = stream;

        // Start Recording

        document.getElementById("start").addEventListener("click", () => {

            mediaRecorder = new MediaRecorder(stream);

            mediaRecorder.start(1000);

            // mediaRecorder.addEventListener("dataavailable", function (e) {
            //     parts.push(e.data);
            // });
            mediaRecorder.ondataavailable = function (e) {
                    parts.push(e.data);
            };

        })

        // Stop Recording

        document.getElementById("stop").addEventListener("click", () => {

            mediaRecorder.stop();

            let blob = new Blob(parts,{
                type : "video/webm"
            });

            const url = URL.createObjectURL(blob);

            let a = document.createElement("a");

            a.href = url;

            a.style.display = "none";

            a.download = "record.webm";

            document.body.appendChild(a);
            
            a.click();

            parts = null;
        })
    })
})

