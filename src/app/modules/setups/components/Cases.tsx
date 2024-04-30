import CommonComponent from "./CommonComponent.tsx";

export const Cases = () => {
    const columns = [
        {
            title: 'Code',
            accessor: 'name',
        },
        {
            title: 'Title',
            accessor: 'description',
        },
        {
            title: 'Status',
            accessor: 'updated_at',
        },
        {
            title: 'isFeatured',
        },
        {
            title: 'Actions',
        }
    ];
    return (
        <CommonComponent
            url='SageModules1'
            title='Cases'
            refreshKey='cases'
        />
    );
};