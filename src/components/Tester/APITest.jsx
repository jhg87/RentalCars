import React, { useEffect } from "react";

const APItest = () => {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [formData, setFormData] = React.useState({
    UserName: "",
    Password: "",
  });

  // here we make post to the  API
  const postData = async () => {
    try {
      const response = await fetch(
        "http://localhost/SmartKey/Backend/api/users/",
        {
          method: "POST",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            UserName: formData.UserName,
            Password: formData.Password,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      console.log("Post response:", result);
    } catch (error) {
      console.error("Post error:", error);
    }
    clearForm();
  };

  function handleChange(event) {
    console.log(event);
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }

  const clearForm = () => {
    setFormData({
      UserName: "",
      Password: "",
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost/SmartKey/Backend/api/users/"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div>
        <form onSubmit={(e) => e.preventDefault()}>
          <label>
            UserName:
            <input
              type="text"
              name="UserName"
              value={formData.UserName}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              name="Password"
              value={formData.Password}
              onChange={handleChange}
            />
          </label>
          <br />
          <button type="submit" onClick={postData}>
            Submit
          </button>
        </form>

        <hr />
      </div>
      {data.length > 0 ? (
        <ul>
          {data.map((item) => (
            <li key={item.UserID}>
              <h3>{item.UserName}</h3>
              <p>{item.Password}</p>
            </li>
          ))}
        </ul>
      ) : loading ? (
        <p>Loading...</p>
      ) : (
        <p>No data available</p>
      )}
    </>
  );
};

export default APItest;
