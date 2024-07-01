import { useEffect, useState } from 'react';
import useApi from '../hooks/useApi';
import { useNavigate } from "react-router-dom";
import styles from '../index.css'



const Dashboard = () => {
    const [jsonData, setJSONData] = useState([]);
    const { apiCall } = useApi();
    const navigate = useNavigate()
    const token = localStorage.getItem('token');


    useEffect(() => {
        if (!token) {
            navigate('/')
        } else {
            fetchItems();
        }
    }, []);

    const fetchItems = async () => {
        try {
            const { data, error } = await apiCall('http://localhost:5000/api/items');
            if (error) {
                console.error('Error fetching items:', error.message);
            } else {
                setJSONData(data);
            }
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };

    const makeCapitalise = (item) => {
        return item?.replaceAll('_', ' ').split(' ').map((str) => str[0].toUpperCase() + str.slice(1)).join(' ')
    }

    const renderValue = (data) => {
        if (typeof data === 'object' && !Array.isArray(data)) {
            return Object.keys(data).map((key) => (
                <div key={key}>
                    <div className='objectKey'>{makeCapitalise(key)}</div>
                    <div>{renderValue(data[key])}</div>
                </div>
            ));
        } else if (Array.isArray(data)) {
            return data.map((item, index) => (
                <div key={index}>{renderValue(item)}</div>
            ));
        } else {
            return <div className='content'>{data}</div>;
        }
    };

    const fetchValue = (obj) => {
        return renderValue(JSON.parse(obj));
    };

    useEffect(() => {
        fetchItems()
    }, [])

    return <div className='list-container'>
        <div className='itemlist'>
            <h1 className='heading'>Welcome To WTVision</h1>
            <div className="itemList">
                {
                    jsonData?.map((item, index) => (
                        <div key={index} className='itemContainer'>
                            <h2>{makeCapitalise(item.key)}</h2>
                            <div>{fetchValue(item.value)}</div>
                            <div className='borderLine'></div>
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
};

export default Dashboard;
