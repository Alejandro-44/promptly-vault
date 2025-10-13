import pytest

@pytest.mark.asyncio
async def test_register_user_success(e2e_client):
    response = await e2e_client.post(
        "/auth/register",
        json={"username": "alice", "email": "alice@example.com", "password": "1234"}
    )

    assert response.status_code == 201
    data = response.json()
    assert data["email"] == "alice@example.com"
    assert "id" in data or "_id" in data


@pytest.mark.asyncio
async def test_register_user_conflict(e2e_client):
    user = {"username": "bob", "email": "bob@example.com", "password": "abcd"}
    await e2e_client.post("/auth/register", json=user)

    response = await e2e_client.post("/auth/register", json=user)
    assert response.status_code == 409


@pytest.mark.asyncio
async def test_login_success_and_cookie_set(e2e_client):
    await e2e_client.post(
        "/auth/register",
        json={"username": "carol", "email": "carol@example.com", "password": "1234"}
    )

    response = await e2e_client.post(
        "/auth/login",
        data={"username": "carol@example.com", "password": "1234"}
    )

    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert "access_token" in response.cookies


@pytest.mark.asyncio
async def test_login_user_not_found(e2e_client):
    response = await e2e_client.post(
        "/auth/login",
        data={"username": "ghost@example.com", "password": "xxx"}
    )
    assert response.status_code == 404


@pytest.mark.asyncio
async def test_change_password_success(e2e_client):
    await e2e_client.post(
        "/auth/register",
        json={"username": "eva", "email": "eva@example.com", "password": "oldpass"}
    )

    response = await e2e_client.post(
        "/auth/login",
        data={"username": "eva@example.com", "password": "oldpass"}
    )

    assert response.status_code == 200
    token = response.json()["access_token"]

    response = await e2e_client.post(
        "/auth/change-password",
        json={"old_password": "oldpass", "new_password": "newpass"},
        headers={"Authorization": f"Bearer {token}"}
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