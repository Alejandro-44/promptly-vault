import pytest


@pytest.mark.asyncio
async def test_register_user_success(e2e_client):
    test_user = {"username": "alice", "email": "alice@example.com", "password": "1234"} 
    response = await e2e_client.post(
        "/auth/register",
        json=test_user
    )

    assert response.status_code == 201
    data = response.json()
    assert data["email"] == test_user["email"]
    assert "id" in data


@pytest.mark.asyncio
async def test_register_user_conflict(e2e_client):
    test_user = {"username": "bob", "email": "bob@example.com", "password": "abcd"}
    await e2e_client.post("/auth/register", json=test_user)

    response = await e2e_client.post("/auth/register", json=test_user)
    assert response.status_code == 409


@pytest.mark.asyncio
async def test_login_flow_with_cookie(e2e_client):
    test_user = {
        "username": "test",
        "email": "test@example.com",
        "password": "examplePass123",
    }

    response = await e2e_client.post("/auth/register", json=test_user)
    assert response.status_code == 201

    login_data = {
        "username": test_user["email"],
        "password": test_user["password"],
    }

    response = await e2e_client.post("/auth/login", data=login_data)
    assert response.status_code == 200

    assert "access_token" in response.cookies, "Cookie not found in request"

    cookie_client = e2e_client
    cookie_client.cookies.set("access_token", response.cookies.get("access_token"))

    response = await cookie_client.get("users/me")
    assert response.status_code == 200
    data = response.json()

    assert data["email"] == test_user["email"]


@pytest.mark.asyncio
async def test_login_user_not_found(e2e_client):
    test_user = {"username": "ghost@example.com", "password": "xxx"}
    response = await e2e_client.post(
        "/auth/login",
        data=test_user
    )
    assert response.status_code == 404


@pytest.mark.asyncio
async def test_change_password_success(e2e_client):
    test_user = {"username": "eva", "email": "eva@example.com", "password": "oldpass"}

    await e2e_client.post(
        "/auth/register",
        json=test_user
    )

    response = await e2e_client.post(
        "/auth/login",
        data={"username": test_user["email"], "password": test_user["password"]}
    )

    assert response.status_code == 200

    cookie_client = e2e_client
    cookie_client.cookies.set("access_token", response.cookies.get("access_token"))

    response = await cookie_client.post(
        "/auth/change-password",
        json={"old_password": "oldpass", "new_password": "newpass"},
    )

    assert response.status_code == 204


@pytest.mark.asyncio
async def test_change_password_wrong_password(e2e_client):
    await e2e_client.post(
        "/auth/register",
        json={"username": "frank", "email": "frank@example.com", "password": "rightpass"}
    )

    response = await e2e_client.post(
        "/auth/change-password",
        json={"old_password": "wrongpass", "new_password": "newpass"}
    )
    assert response.status_code in (401, 400)
