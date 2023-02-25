/* eslint-disable class-methods-use-this */
class DogFoodApi {
  constructor({ baseUrl }) {
    this.baseUrl = baseUrl;
  }

  getAuthorizationHeader(token) {
    return `Bearer ${token}`;
  }

  checkToken(token) {
    if (!token) throw new Error('Отсутствует токен');
  }

  async signIn(values) {
    const res = await fetch(`${this.baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    if (res.status === 401) {
      throw new Error('Неверные логин или пароль');
    }
    if (res.status === 404) {
      throw new Error('Пользователь с указанным email не найден');
    }
    if (res.status >= 400) {
      throw new Error(`Ошибка, код ${res.status}`);
    }

    return res.json();
  }

  async signUp(values) {
    const res = await fetch(`${this.baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    if (res.status === 400) {
      throw new Error('Некорректно заполнено одно из полей');
    }
    if (res.status === 409) {
      throw new Error('Пользователь с указанным email уже существует');
    }
    if (res.status >= 401) {
      throw new Error(`Ошибка, код ${res.status}`);
    }

    return res.json();
  }

  async getAllProducts(token) {
    this.checkToken(token);

    const res = await fetch(`${this.baseUrl}/products`, {
      headers: {
        authorization: this.getAuthorizationHeader(token),
        'Content-type': 'application/json',
      },
    });

    if (res.status >= 400 && res.status < 500) {
      throw new Error(`Произошла ошибка при получении списка товаров. 
        Проверьте отправляемые данные. Status: ${res.status}`);
    }
    if (res.status >= 500) {
      throw new Error(`Произошла ошибка при получении списка товаров. 
        Попробуйте сделать запрос позже. Status: ${res.status}`);
    }

    return res.json();
  }

  async getQueryProducts(query, token) {
    this.checkToken(token);

    const res = await fetch(`${this.baseUrl}/products/search?query=${query}`, {
      headers: {
        authorization: this.getAuthorizationHeader(token),
        'Content-type': 'application/json',
      },
    });

    if (res.status >= 400 && res.status < 500) {
      throw new Error(`Произошла ошибка при получении списка товаров. 
        Проверьте отправляемые данные. Status: ${res.status}`);
    }
    if (res.status >= 500) {
      throw new Error(`Произошла ошибка при получении списка товаров. 
        Попробуйте сделать запрос позже. Status: ${res.status}`);
    }

    return res.json();
  }

  getProductsByIds(ids, token) {
    this.checkToken(token);

    return Promise.all(ids.map((id) => fetch(`${this.baseUrl}/products/${id}`, {
      headers: {
        authorization: this.getAuthorizationHeader(token),
        'Content-type': 'application/json',
      },
    })
      .then((res) => res.json())));
  }

  async addNewProduct(values, token) {
    this.checkToken(token);

    const res = await fetch(`${this.baseUrl}/products`, {
      method: 'POST',
      headers: {
        authorization: this.getAuthorizationHeader(token),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    if (res.status >= 400 && res.status < 500) {
      throw new Error(`Произошла ошибка при добавлении товара. 
        Проверьте отправляемые данные. Status: ${res.status}`);
    }
    if (res.status >= 500) {
      throw new Error(`Произошла ошибка при добавлении товара. 
        Попробуйте сделать запрос позже. Status: ${res.status}`);
    }

    return res.json();
  }

  async deleteProductById(id, token) {
    this.checkToken(token);

    const res = await fetch(`${this.baseUrl}/products/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this.getAuthorizationHeader(token),
        'Content-Type': 'application/json',
      },
    });

    if (res.status >= 400 && res.status < 500) {
      throw new Error(`Произошла ошибка при удалении товара. 
        Проверьте отправляемые данные. Status: ${res.status}`);
    }
    if (res.status >= 500) {
      throw new Error(`Произошла ошибка при удалении товара. 
        Попробуйте сделать запрос позже. Status: ${res.status}`);
    }

    return res.json();
  }

  async editProductById(values, id, token) {
    this.checkToken(token);

    const res = await fetch(`${this.baseUrl}/products/${id}`, {
      method: 'PATCH',
      headers: {
        authorization: this.getAuthorizationHeader(token),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    if (res.status >= 400 && res.status < 500) {
      throw new Error(`Произошла ошибка при обновлении товара. 
        Проверьте отправляемые данные. Status: ${res.status}`);
    }
    if (res.status >= 500) {
      throw new Error(`Произошла ошибка при обновлении товара. 
        Попробуйте сделать запрос позже. Status: ${res.status}`);
    }

    return res.json();
  }

  async getProductById(id, token) {
    this.checkToken(token);

    const res = await fetch(`${this.baseUrl}/products/${id}`, {
      headers: {
        authorization: this.getAuthorizationHeader(token),
        'Content-type': 'application/json',
      },
    });

    if (res.status >= 400 && res.status < 500) {
      throw new Error(`Произошла ошибка при получении товара. 
        Проверьте отправляемые данные. Status: ${res.status}`);
    }
    if (res.status >= 500) {
      throw new Error(`Произошла ошибка при получении товара. 
        Попробуйте сделать запрос позже. Status: ${res.status}`);
    }

    return res.json();
  }

  async addReview(values, id, token) {
    this.checkToken(token);

    const res = await fetch(`${this.baseUrl}/products/review/${id}`, {
      method: 'POST',
      headers: {
        authorization: this.getAuthorizationHeader(token),
        'Content-type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    if (res.status >= 400 && res.status < 500) {
      throw new Error(`Произошла ошибка при добавлении отзыва. 
        Проверьте отправляемые данные. Status: ${res.status}`);
    }
    if (res.status >= 500) {
      throw new Error(`Произошла ошибка при добавлении отзыва.
        Попробуйте сделать запрос позже. Status: ${res.status}`);
    }

    return res.json();
  }

  async getUserInfo(group, token) {
    this.checkToken(token);

    const res = await fetch(`${this.baseUrl}/v2/${group}/users/me`, {
      headers: {
        authorization: this.getAuthorizationHeader(token),
        'Content-type': 'application/json',
      },
    });

    if (res.status >= 400 && res.status < 500) {
      throw new Error(`Произошла ошибка при получении профиля пользователя. 
        Проверьте отправляемые данные. Status: ${res.status}`);
    }
    if (res.status >= 500) {
      throw new Error(`Произошла ошибка при получении профиля пользователя. 
        Попробуйте сделать запрос позже. Status: ${res.status}`);
    }

    return res.json();
  }
}

export const dogFoodApi = new DogFoodApi({ baseUrl: 'https://api.react-learning.ru' });
