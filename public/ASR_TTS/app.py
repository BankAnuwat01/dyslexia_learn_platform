from flask import Flask, request, jsonify
from os import remove  # Import for file removal

# Huawei Cloud Credentials (Replace with yours)
ak = 'PV3IFXGEDUNJTQY6RSVV'
sk = 'iiokTMRMJZ517llHT7F6WitaBbfUC0s7AD7CFVG9'
region = 'AP-Bangkok'     

# Configure SIS client
from huaweicloudsdkcore.auth.credentials import BasicCredentials
from huaweicloudsdkcore.client import ClientBuilder
from huaweicloudsdksis.v1.region.sis_region import SisRegion
from huaweicloudsdksis.v1 import SisClient
from huaweicloudsdksis.v1.model.run_asr_request import RunAsrRequest
from huaweicloudsdksis.v1.model.post_short_audio_req import PostShortAudioReq

def create_sis_client():
  credentials = BasicCredentials(ak, sk).with_project_id('[Your Project ID]')
  return ClientBuilder().with_credentials(credentials).with_region(SisRegion.value_of(region)).build(SisClient)

sis_client = create_sis_client()  # Create client instance

def transcribe_audio(file_path):
    """Convert Speech to Text using Huawei SIS."""
    try:
        with open(file_path, 'rb') as audio_file:
            audio_data = audio_file.read()

        # Configure the ASR request
        asr_request = RunAsrRequest()
        req_body = PostShortAudioReq(
            data=audio_data,
            config={
                "language": "en-us",
                "format": "wav",
                "property": "chinese_16k_common"
            }
        )
        asr_request.body = req_body

        response = sis_client.run_asr(asr_request)
        return response.result.text
    except Exception as e:
        return str(e)

app = Flask(__name__)

@app.route('/transcribe', methods=['POST'])
def transcribe():
    """Endpoint to transcribe audio."""
    if 'audio_file' not in request.files:
        return jsonify({'error': 'No audio file uploaded'}), 400

    file = request.files['audio_file']
    file_path = f"./temp/{file.filename}"
    file.save(file_path)

    # Perform ASR
    text = transcribe_audio(file_path)

    # Cleanup
    remove(file_path)
    return jsonify({'transcription': text})

if __name__ == '__main__':
    app.run(debug=True)