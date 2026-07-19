function StatCard(props) {
    return (
        <div className="flex-1 rounded-xl bg-white p-6 shadow-md">
            <h2 className="text-gray-600 text-2xl">{props.title}</h2>
            <p className="text-4xl font-bold text-blue-500">{props.value}</p>
        </div>
    );
}

export default StatCard;