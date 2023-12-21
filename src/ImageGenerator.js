import React, { useEffect, useState } from 'react';

function ImageGenerator() {
    // const apiURL = "https://api.openai.com/v1/images/generations";
    const apiURL = "https://api.stability.ai/v1/generation/stable-diffusion-v1-6/text-to-image";
    const sentence = "beautiful flowers";
    const [imageSrc, setImageSrc] = useState(localStorage.getItem('latestImage'));
    const firstDay = 19711;
    const [index, setIndex] = useState(0);

    const textStyles = {
        fontFamily: 'sans',
        color: 'white',
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
    }
    const imageStyles = {
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
    }

    const generateImage = async () => {
        try {
            const response = await fetch(
                apiURL,
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        Authorization: `Bearer sk-B31YOIUjZWk9nFGxXQ0qqnctnDi224tgaoBq6KDOiW7BJzrW`,
                    },
                    body: JSON.stringify({
                        text_prompts: [
                            {
                                text: sentence
                            }
                        ],
                        cfg_scale: 7,
                        height: 512,
                        width: 512,
                        steps: 30,
                        samples: 1,
                    })
                }
            );

            let data = await response.json();
            console.log(data.artifacts);
            const imageContent = data.artifacts[0]["base64"];
            const imageSrc = `data:image/png;base64, ${imageContent}`;
            console.log(imageSrc);
            return imageSrc;
        } catch(e) {console.log(e)}
    }

    const generateAndDisplayImage = async () => {
        const imageSrc = await generateImage();
        setImageSrc(imageSrc);
        localStorage.setItem('latestImage', imageSrc);
    }

    useEffect(() => {
        if(!localStorage.getItem('index')) generateAndDisplayImage();localStorage.setItem('index', 1);
        const today = ((((new Date).getTime()/1000)/60)/60)/24;
        if(Math.floor(today-firstDay) > Number(localStorage.getItem('index'))) {
            localStorage.setItem('index', Math.floor(today-firstDay));
            generateAndDisplayImage();
        }
        setIndex(Math.floor(today-firstDay));
    }, []);

    return (
        <div className='container'>
            <div className='container' style={{textAlign: 'center'}}>
                <h1 className='container-fluid' style={textStyles}>💗Daily Love💖</h1>
                <h3 className='container-fluid' style={textStyles}>Day {index}</h3>
            </div>
            {imageSrc ? 
            <div className='container'>
                <img className='img-fluid rounded' src={imageSrc} width={512} height={512} style={imageStyles}/>
            </div>
            : <></>
            }
        </div>
    );
}

export default ImageGenerator;
