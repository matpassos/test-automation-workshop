# Gift giver

# Install dependencies
The project uses the Python 3.7.0, make sure that you're using the correct version. Also, you need to be in the root folder of the gift giver Python project.

Run:
```shell
cp .env-sample .env
pipenv shell # Spawns a shell within the virtualenv.
pipenv install --dev # Install all dependencies for a project (including dev):
```

Access http://localhost:5000/

# Run
```shell
pipenv run server
```

# Test
```shell
pipenv run test
```

# Lint
```shell
pipenv run lint
```
