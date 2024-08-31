
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FaUndo, FaDollarSign } from 'react-icons/fa';
import { Card, Title, Form, Input, Button, Table, ErrorMessage, Container } from '../styles/StyledComponents';
import { refunds, addRefund } from '../utils/dummyData';

const RefundManagement = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = (data) => {
    addRefund({
      affiliate: data.affiliate,
      originalCommission: parseFloat(data.originalCommission),
      adjustment: -parseFloat(data.adjustment)
    });
    toast.success('Refund processed successfully!');
    reset();
  };

  return (
    <>
      <Card>
        <Title><FaUndo /> Refund Management</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("affiliate", { required: "Affiliate name is required" })}
            placeholder="Affiliate Name"
          />
          {errors.affiliate && <ErrorMessage>{errors.affiliate.message}</ErrorMessage>}
          <Input
            {...register("originalCommission", { 
              required: "Original commission is required",
              min: { value: 0, message: "Commission must be positive" }
            })}
            placeholder="Original Commission"
            type="number"
            step="0.01"
          />
          {errors.originalCommission && <ErrorMessage>{errors.originalCommission.message}</ErrorMessage>}
          <Input
            {...register("adjustment", { 
              required: "Adjustment amount is required",
              min: { value: 0, message: "Adjustment must be positive" }
            })}
            placeholder="Adjustment Amount"
            type="number"
            step="0.01"
          />
          {errors.adjustment && <ErrorMessage>{errors.adjustment.message}</ErrorMessage>}
          <Button type="submit">
            <FaDollarSign /> Process Refund
          </Button>
        </Form>
      </Card>

      <Card>
        <Title>Refund Data</Title>
        <Table>
          <thead>
            <tr>
              <th>Affiliate</th>
              <th>Original Commission</th>
              <th>Adjustment</th>
            </tr>
          </thead>
          <tbody>
            {refunds.map((refund, index) => (
              <tr key={index}>
                <td>{refund.affiliate}</td>
                <td>${refund.originalCommission.toFixed(2)}</td>
                <td>${refund.adjustment.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </>
  );
};

export default RefundManagement;
