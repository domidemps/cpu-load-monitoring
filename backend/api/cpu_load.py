from fastapi import APIRouter, FastAPI
import psutil

app = FastAPI()


@app.get('/api/average-cpu-load')
async def get_average_cpu_load() -> float:
    """Get the average system load over 1 minute,
    normalized by the number of CPU units."""

    return psutil.getloadavg()[0] / psutil.cpu_count()
