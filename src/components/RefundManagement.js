import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FaUndo, FaDollarSign } from 'react-icons/fa';
import { ThreeDots } from 'react-loader-spinner';
import { Card, Title, Form, Input, Button, Table, ErrorMessage } from '../styles/StyledComponents';
import { refunds, addRefund } from '../utils/dummyData';

const RefundManagement = ({ addNotification }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const newRefund = {
        affiliate: data.affiliate,
        originalCommission: parseFloat(data.originalCommission),
        adjustment: -parseFloat(data.adjustment)
      };
      const notification = addRefund(newRefund);
      if (notification) {
        addNotification(notification);
      }
      
      toast.success('Refund processed successfully!');
      reset();
    } catch (error) {
      toast.error('Error processing refund. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
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
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <ThreeDots color="#ffffff" height={20} width={20} />
          ) : (
            <>
              <FaDollarSign /> Process Refund
            </>
          )}
        </Button>
      </Form>
      <Table>
        <thead>
          <tr>
            <th>Affiliate</th>
            <th>Original Commission</th>
            <th>Adjustment</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {refunds.map((refund) => (
            <tr key={refund.id}>
              <td>{refund.affiliate}</td>
              <td>${refund.originalCommission.toFixed(2)}</td>
              <td>${refund.adjustment.toFixed(2)}</td>
              <td>{refund.date}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
  );
};

export default RefundManagement;