status = "";
objects = [];

function preload()
{
    song = new Audio("alarm_rock.mp3");
}

function setup()
{
    canvas = createCanvas(640 ,420);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded()
{
    console.log("Model Loaded");
    status = true;
    objectDetector.detect(video, gotResult);
}

function gotResult(error, results)
{
    if (error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw()
{
    image(video, 0, 0, 640, 420);

    if (status != "")
    {
        r = random(250);
        g = random(250);
        b = random(250);
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : Objecst Detected";
            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            nofill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if (objects[i].label == "person")
            {
                document.getElementById("baby").innerHTML = "Baby is Found";
                song.stop();
            }
            else
            {
                document.getElementById("baby").innerHTML = "Baby is not Found";
                song.play();
            }
            if (objects.length = 0)
            {
                document.getElementById("status").innerHTML = "No Baby detected";
                document.getElementById("baby").innerHTML = "Baby is not Found";
                song.play();
            }
        }
    }
}