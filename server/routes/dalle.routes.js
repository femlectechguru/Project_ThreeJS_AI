import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';




dotenv.config();

const router = express.Router();

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);
 
router.route('/').get((req, res) => {
    res.status(200).json({ message: "Hello from DALLE.E ROUTES"})
}) 

router.route('/').post(async (req, res) => {
    try {
        const { prompt } = req.body;
        console.log('Request Payload:', req.body);

        const response = await openai.createImage({
            prompt,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json' 
        });
        console.log('OpenAI API Response:', response); // Log the full response from OpenAI

        if (!response.data || !Array.isArray(response.data.data) || response.data.data.length === 0) {
            console.error('Invalid API response:', response.data);
            return res.status(500).json({ message: "Invalid response from OpenAI API" });
        }

        const image = response.data.data[0].b64_json;
        console.log('Image Data:', image); // Log the image data

        res.status(200).json({ photo: image });
    } catch (error) {
        console.error("Error in OpenAI API call:", error);
        console.log("Full error object:", error);

        if (error.response && error.response.data) {
            console.log("Error response:", error.response.data); // Log the error response from OpenAI
        } else {
            console.log("Unknown error:", error); // Log the error if no detailed response is available
        }
        res.status(500).json({ message: "something went wrong" });
    }
});

/* router.route('/').post(async (req, res) => {
    try {
        const { prompt } = req.body;
        console.log('Request Payload:', req.body);

        const response = await openai.createImage({
            prompt,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json' 
        });
        console.log('OpenAI API Response:', response.data); // Log the full response from OpenAI

        const image = response.data.data[0].b64_json;

        

        res.status(200).json({photo: image});
    } catch (error){
        console.error("Error in OpenAI API call:", error);


        res.status(500).json({ message: "something went wrong" });
    }
}); */

export default router;