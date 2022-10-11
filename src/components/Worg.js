const urlPost = "http://localhost/api_cogent/api/job_category/update/";
    const { id } = useParams();
    const [data, setData] = useState({
        category_name: ""
    })

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        const resultCategory = await axios.get("http://localhost/api_cogent/api/job_category/view_job/" + id);
        console.log(resultCategory);
        setData(resultCategory.data)
    }
    function handleSubmit(e) {
        e.preventDefault();
        axios.post(urlPost + id, data)
            .then(res => {
                alert("Update Successfully");
                console.log(res.data);
            })
    }
    function handleChange(e) {
        const newdata = { ...data }
        newdata[e.target.id] = e.target.value
        setData(newdata)
        console.log(newdata)
    }
