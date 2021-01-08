---
Title: The is my first post!
Author: Rabih Andari
Date: 16 September, 2020
---

# Using States with React.js

```jsx
import React, { useState } from 'react';

const app = () => {
    const [title, setTitle] = useState("");

    return(
        <h1> This is my {title}</h1>
    );
}
```

As a conclusion, this is how you use **useState()** hook in your React App.

