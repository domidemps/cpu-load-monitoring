import unittest

from fastapi.testclient import TestClient

from backend.api.cpu_load import app


class TestCPULoad(unittest.TestCase):

    def setUp(self):
        self._client = TestClient(app)

    def test_get_average_cpu_load(self):
        response = self._client.get('/api/average-cpu-load')
        self.assertEqual(response.status_code, 200)
        self.assertGreaterEqual(response.json(), 0)
        self.assertIsInstance(response.json(), float)


if __name__ == '__main__':
    unittest.main()
