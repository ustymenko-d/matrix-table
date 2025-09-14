import Form from '@/components/Form/Form';
import Table from '@/components/Table/Table';
import Welcome from '@/components/Welcome';
import useTableContext from '@/hooks/useTableContext';

function App() {
	const { tableParams } = useTableContext();

	return (
		<main className='container min-h-screen mx-auto'>
			<Welcome />
			{tableParams ? <Table /> : <Form />}
		</main>
	);
}

export default App;
