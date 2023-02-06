class DogFoodApi {
  constructor({ baseUrl }) {
    this.baseUrl = baseUrl;
    this.token = '';
  }

  getAuthorizationHeader() {
    return `Bearer ${this.token}`;
  }

  setToken(token) {
    this.token = token;
  }

  checkToken() {
    if (!this.token) throw new Error('Отсутствует токен');
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

    return res.json();
  }

  async getAllProducts() {
    this.checkToken();

    const res = await fetch(`${this.baseUrl}/products`, {
      headers: {
        authorization: this.getAuthorizationHeader(),
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

  async getQueryProducts(query) {
    this.checkToken();

    const res = await fetch(`${this.baseUrl}/products/search?query=${query}`, {
      headers: {
        authorization: this.getAuthorizationHeader(),
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

  getProductsByIds(ids) {
    this.checkToken();

    return Promise.all(ids.map((id) => fetch(`${this.baseUrl}/products/${id}`, {
      headers: {
        authorization: this.getAuthorizationHeader(),
        'Content-type': 'application/json',
      },
    })
      .then((res) => res.json())));
  }
}

export const dogFoodApi = new DogFoodApi({ baseUrl: 'https://api.react-learning.ru' });
