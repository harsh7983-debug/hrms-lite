from rest_framework.views import exception_handler

def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)

    if response is not None:
        error_message = None

        if isinstance(response.data, dict):
            first_key = list(response.data.keys())[0]
            value = response.data[first_key]

            if isinstance(value, list):
                error_message = value[0]
            else:
                error_message = value
        else:
            error_message = response.data

        response.data = {
            "error": error_message
        }

    return response