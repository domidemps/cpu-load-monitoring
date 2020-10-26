from fastapi import APIRouter, FastAPI
import psutil

app = FastAPI()


@app.get('/average-cpu-load')
async def get_average_cpu_load() -> float:
    """Get the average system load over 1 minute,
    normalized by the number of CPU units."""

    return round(psutil.getloadavg()[0] / psutil.cpu_count(), 2)
