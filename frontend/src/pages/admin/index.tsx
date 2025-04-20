import React from 'react';
import { useTranslation } from 'next-i18next';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import StatCard from '../../components/admin/StatCard';
import ChartCard from '../../components/admin/ChartCard';
import DataTable from '../../components/admin/DataTable';

const AdminDashboard: React.FC = () => {
  const { t } = useTranslation('common');
  
  // Dados de exemplo para demonstração
  const summaryData = {
    totalSales: '€12,345.67',
    totalOrders: 156,
    pendingOrders: 23,
    totalProducts: 89,
    lowStockProducts: 12,
    totalCustomers: 78,
  };
  
  const recentOrders = [
    { id: '1001', customer: 'João Silva', date: '15/04/2025', total: '€79.97', status: 'Entregue' },
    { id: '1002', customer: 'Maria Santos', date: '14/04/2025', total: '€129.50', status: 'Em processamento' },
    { id: '1003', customer: 'Pedro Costa', date: '13/04/2025', total: '€45.99', status: 'Enviado' },
    { id: '1004', customer: 'Ana Oliveira', date: '12/04/2025', total: '€199.90', status: 'Pago' },
    { id: '1005', customer: 'Carlos Ferreira', date: '11/04/2025', total: '€67.45', status: 'Entregue' },
  ];
  
  const topProducts = [
    { name: 'Produto 1', sold: 45, revenue: '€1,345.55' },
    { name: 'Produto 2', sold: 38, revenue: '€950.00' },
    { name: 'Produto 3', sold: 32, revenue: '€640.00' },
    { name: 'Produto 4', sold: 28, revenue: '€1,120.00' },
    { name: 'Produto 5', sold: 25, revenue: '€875.00' },
  ];
  
  const orderColumns = [
    { id: 'id', label: 'ID' },
    { id: 'customer', label: 'Cliente' },
    { id: 'date', label: 'Data' },
    { id: 'total', label: 'Total' },
    { 
      id: 'status', 
      label: 'Estado',
      render: (order) => {
        const statusClasses = {
          'Entregue': 'bg-green-100 text-green-800',
          'Enviado': 'bg-blue-100 text-blue-800',
          'Em processamento': 'bg-yellow-100 text-yellow-800',
          'Pago': 'bg-purple-100 text-purple-800',
          'Pendente': 'bg-gray-100 text-gray-800',
        };
        
        return (
          <span className={`px-2 py-1 rounded-full text-xs ${statusClasses[order.status] || 'bg-gray-100 text-gray-800'}`}>
            {order.status}
          </span>
        );
      }
    },
  ];
  
  const productColumns = [
    { id: 'name', label: 'Produto' },
    { 
      id: 'sold', 
      label: 'Vendidos',
      render: (product) => (
        <span className="font-medium">{product.sold} unidades</span>
      )
    },
    { id: 'revenue', label: 'Receita' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 flex-shrink-0">
        <AdminSidebar activeLink="dashboard" />
      </div>
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <AdminHeader 
            title="Dashboard" 
            subtitle="Visão geral da sua loja"
          />
          
          {/* Estatísticas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <StatCard 
              title="Vendas Totais" 
              value={summaryData.totalSales} 
              icon="euro-sign" 
              color="blue"
              percentage={12}
              isPositive={true}
            />
            
            <StatCard 
              title="Total de Encomendas" 
              value={summaryData.totalOrders} 
              icon="shopping-cart" 
              color="green"
              percentage={8}
              isPositive={true}
            />
            
            <StatCard 
              title="Encomendas Pendentes" 
              value={summaryData.pendingOrders} 
              icon="clock" 
              color="yellow"
            />
            
            <StatCard 
              title="Total de Produtos" 
              value={summaryData.totalProducts} 
              icon="box" 
              color="purple"
            />
            
            <StatCard 
              title="Produtos com Baixo Stock" 
              value={summaryData.lowStockProducts} 
              icon="exclamation-triangle" 
              color="red"
              percentage={5}
              isPositive={false}
            />
            
            <StatCard 
              title="Total de Clientes" 
              value={summaryData.totalCustomers} 
              icon="users" 
              color="blue"
              percentage={15}
              isPositive={true}
            />
          </div>
          
          {/* Gráficos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <ChartCard 
              title="Vendas dos Últimos 30 Dias" 
              subtitle="Valores em euros"
            >
              <div className="h-64 flex items-center justify-center bg-gray-100 rounded">
                <p className="text-gray-500">Gráfico de vendas será exibido aqui</p>
              </div>
            </ChartCard>
            
            <ChartCard 
              title="Distribuição de Vendas por Categoria" 
              subtitle="Baseado nas vendas do mês atual"
            >
              <div className="h-64 flex items-center justify-center bg-gray-100 rounded">
                <p className="text-gray-500">Gráfico de categorias será exibido aqui</p>
              </div>
            </ChartCard>
          </div>
          
          {/* Tabelas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-semibold mb-4">Encomendas Recentes</h2>
              <DataTable 
                columns={orderColumns} 
                data={recentOrders}
                onRowClick={(order) => console.log('Clicou na encomenda:', order.id)}
              />
            </div>
            
            <div>
              <h2 className="text-lg font-semibold mb-4">Produtos Mais Vendidos</h2>
              <DataTable 
                columns={productColumns} 
                data={topProducts}
                onRowClick={(product) => console.log('Clicou no produto:', product.name)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

// Configuração para i18n
export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      // Você precisará configurar o i18next aqui
    },
  };
}
