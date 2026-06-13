'use client';

import { useEffect, useMemo, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-AE', {
    style: 'currency',
    currency: 'AED',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function MortgageCalculator({ propertyPrice }: { propertyPrice: number }) {
  const initialPrice = useMemo(() => (propertyPrice > 0 ? propertyPrice : 0), [propertyPrice]);
  const [purchasePrice, setPurchasePrice] = useState(initialPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [loanPeriod, setLoanPeriod] = useState(25);
  const [interestRate, setInterestRate] = useState(4.5);

  useEffect(() => {
    setPurchasePrice(initialPrice);
  }, [initialPrice]);

  const downPaymentAmount = (purchasePrice * downPaymentPercent) / 100;
  const loanAmount = purchasePrice - downPaymentAmount;
  const monthlyInterestRate = interestRate / 100 / 12;
  const numberOfPayments = loanPeriod * 12;

  const monthlyPayment = useMemo(() => {
    if (loanAmount <= 0 || monthlyInterestRate <= 0 || numberOfPayments <= 0) {
      return 0;
    }
    const numerator = loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments);
    const denominator = Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1;
    return denominator === 0 ? 0 : numerator / denominator;
  }, [loanAmount, monthlyInterestRate, numberOfPayments]);

  if (initialPrice <= 0) {
    return null;
  }

  return (
    <div className="space-y-8 border border-white/10 bg-white/[0.02] p-8 md:p-10">
      <div className="space-y-2">
        <h2 className="text-[11px] font-bold tracking-[0.4em] uppercase text-[#D1A08B]">Mortgage Calculator</h2>
        <p className="text-sm text-white/40 font-light">Estimate your monthly mortgage payment.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Property Price (AED)</Label>
            <Input
              type="number"
              value={purchasePrice}
              onChange={(event) => setPurchasePrice(Number(event.target.value) || 0)}
              className="h-12 bg-white/5 border-white/10 rounded-none text-white"
            />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-white/40">
              <span>Down Payment</span>
              <span className="text-[#D1A08B]">{downPaymentPercent}% ({formatCurrency(downPaymentAmount)})</span>
            </div>
            <Slider value={[downPaymentPercent]} onValueChange={([value]) => setDownPaymentPercent(value)} min={5} max={80} step={1} />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-white/40">
              <span>Loan Period</span>
              <span className="text-[#D1A08B]">{loanPeriod} years</span>
            </div>
            <Slider value={[loanPeriod]} onValueChange={([value]) => setLoanPeriod(value)} min={5} max={30} step={1} />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-white/40">
              <span>Interest Rate</span>
              <span className="text-[#D1A08B]">{interestRate}%</span>
            </div>
            <Slider value={[interestRate]} onValueChange={([value]) => setInterestRate(value)} min={1} max={10} step={0.1} />
          </div>
        </div>

        <div className="flex flex-col justify-center gap-6 border border-white/10 bg-black/40 p-8">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2">Estimated Monthly Payment</p>
            <p className="text-3xl font-bold text-[#D1A08B]">{formatCurrency(monthlyPayment)}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-widest text-white/30">Loan Amount</p>
              <p className="text-sm font-bold text-white mt-1">{formatCurrency(loanAmount)}</p>
            </div>
            <div>
              <p className="text-[9px] font-bold uppercase tracking-widest text-white/30">Down Payment</p>
              <p className="text-sm font-bold text-white mt-1">{formatCurrency(downPaymentAmount)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
