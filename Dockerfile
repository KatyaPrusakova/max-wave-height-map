# Backend Stage
FROM thehale/python-poetry AS backend

WORKDIR /app/backend

COPY ./backend/pyproject.toml ./backend/poetry.lock ./backend/main.py ./backend/waves_2019-01-01.nc  /app/backend/


# Install Poetry
RUN pip install poetry


RUN poetry install


COPY ./backend /app/backend

CMD ["poetry", "run", "uvicorn", "main:app", "--reload"]

# Frontend Stage
FROM node:14 AS frontend

WORKDIR /app/frontend

COPY ./frontend/package.json ./frontend/package-lock.json /app/frontend/

RUN npm install

COPY ./frontend /app/frontend

CMD ["npm", "start"]
