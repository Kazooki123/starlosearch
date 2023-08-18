from fastapi import FastAPI, Request, Depends
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from src.Python.Machine_Learning.image_recognition import process_images

app = FastAPI()

# Allow CORS for your frontend (replace origins with your frontend's URL)
origins = ["http://localhost:5500"]
app.add_middleware(CORSMiddleware, allow_origins=origins, allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

@app.post("/image_recognition")
async def image_recognition(request: Request, data: dict = Depends()):
    image_urls = data.get('image_urls', [])

    recognition_result = process_images(image_urls)
    return JSONResponse(content={"result": recognition_result})

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=5500)
