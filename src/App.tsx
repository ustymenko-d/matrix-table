import Form from '@/components/Form/Form';
import Table from '@/components/Table/Table';
import Welcome from '@/components/Welcome';
import useTableContext from '@/hooks/useTableContext';

function App() {
	const { tableParams } = useTableContext();

	return (
		<main className='container mx-auto min-h-screen'>
			<Welcome />
			{tableParams ? <Table /> : <Form />}
		</main>
	);
}

export default App;
