import secrets

# used once and key is saved!!
SECRET_KEY = secrets.token_urlsafe(32)
print(SECRET_KEY)

