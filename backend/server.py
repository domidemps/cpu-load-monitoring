import uvicorn


if __name__ == '__main__':
    uvicorn.run(
        'api.cpu_load:app', host='localhost', port=5000,
        log_level='info', reload=True)
