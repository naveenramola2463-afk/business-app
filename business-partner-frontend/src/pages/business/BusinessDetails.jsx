import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import PartnerTable from "../../components/partner/PartnerTable";
import PartnerForm from "../../components/partner/PartnerForm";
import InvestmentForm from "../../components/investment/InvestmentForm";
import InvestmentTable from "../../components/investment/InvestmentTable";
import ProfitDistributionTable from "../../components/profit/ProfitDistributionTable";
import Modal from "../../components/common/Modal";
import Loader from "../../components/common/Loader";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import businessService from "../../services/businessService";
import partnerService from "../../services/partnerService";
import investmentService from "../../services/investmentService";
import profitService from "../../services/profitService";
import formatCurrency from "../../utils/formatCurrency";
import { Plus, Users, TrendingUp, DollarSign, Trash2 } from "lucide-react";

const TABS = ["Overview", "Investments", "Profit"];

const BusinessDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [deleting, setDeleting] = useState(false);

  const [business, setBusiness] = useState(null);
  const [partners, setPartners] = useState([]);
  const [investments, setInvestments] = useState([]);
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [profits, setProfits] = useState([]);

  const [activeTab, setActiveTab] = useState("Overview");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [partnerModalOpen, setPartnerModalOpen] = useState(false);
  const [partnerFormLoading, setPartnerFormLoading] = useState(false);
  const [availableUsers, setAvailableUsers] = useState([]);

  const [investmentFormLoading, setInvestmentFormLoading] = useState(false);

  const [profitFormData, setProfitFormData] = useState({
    total_amount: "",
    type: "profit",
    remarks: "",
  });
  const [profitCreating, setProfitCreating] = useState(false);
  const [selectedProfit, setSelectedProfit] = useState(null);

  const fetchAll = useCallback(async () => {
    try {
      setLoading(true);
      const [businessData, partnersData, investmentData, profitsData] =
        await Promise.all([
          businessService.getBusinessById(id),
          partnerService.getPartnersByBusiness(id),
          investmentService.getInvestmentsByBusiness(id),
          profitService.getProfitsByBusiness(id),
        ]);

      setBusiness(businessData);
      setPartners(partnersData);
      setInvestments(investmentData.investments);
      setTotalInvestment(investmentData.total_investment);
      setProfits(profitsData);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to load business details",
      );
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchAll();
  }, [fetchAll]);

  // ---- Partner handlers ----
  const openPartnerModal = async () => {
    try {
      const users = await partnerService.getAvailableUsers(id);
      setAvailableUsers(users);
      setPartnerModalOpen(true);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to load users");
    }
  };

  const handleAddPartner = async ({ user_id }) => {
    setPartnerFormLoading(true);
    try {
      await partnerService.addPartner({ user_id, business_id: id });
      setPartnerModalOpen(false);
      fetchAll();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add partner");
    } finally {
      setPartnerFormLoading(false);
    }
  };

  const handleRemovePartner = async (partnerId) => {
    if (!confirm("Remove this partner from the business?")) return;
    try {
      await partnerService.removePartner(partnerId);
      fetchAll();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to remove partner");
    }
  };

  const handleDeleteBusiness = async () => {
    if (
      !confirm(
        `Delete "${business.name}"? This will remove all partners, investments, and profit records permanently.`,
      )
    )
      return;

    setDeleting(true);
    try {
      await businessService.deleteBusiness(id);
      navigate("/business");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete business");
      setDeleting(false);
    }
  };

  // ---- Investment handler ----
  const handleAddInvestment = async ({ partner_id, amount }) => {
    setInvestmentFormLoading(true);
    try {
      await investmentService.addInvestment({
        partner_id,
        business_id: id,
        amount,
      });
      fetchAll();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add investment");
    } finally {
      setInvestmentFormLoading(false);
    }
  };

  // ---- Profit handlers ----
  const handleProfitChange = (e) => {
    setProfitFormData({ ...profitFormData, [e.target.name]: e.target.value });
  };

  const handleCreateProfit = async (e) => {
    e.preventDefault();
    setProfitCreating(true);
    try {
      await profitService.createProfit({ ...profitFormData, business_id: id });
      setProfitFormData({ total_amount: "", type: "profit", remarks: "" });
      fetchAll();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create profit");
    } finally {
      setProfitCreating(false);
    }
  };

  const handleViewProfitDetails = async (profitId) => {
    try {
      const data = await profitService.getProfitDetails(profitId);
      setSelectedProfit(data);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to load profit details");
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <Loader />
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="bg-rose-500/10 border border-rose-500/25 text-rose-400 text-[13.5px] p-3 rounded-lg">
          {error}
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-white">
            {business?.name}
          </h1>
          <p className="text-[#9aa0b4] text-[13.5px] mt-1">
            {business?.description || "No description provided"}
          </p>
        </div>

        <button
          onClick={handleDeleteBusiness}
          disabled={deleting}
          className="flex items-center gap-1.5 text-[13px] text-rose-400 hover:text-rose-300 font-medium px-3 py-1.5 rounded-lg border border-rose-500/25 hover:bg-rose-500/10 transition-colors disabled:opacity-50"
        >
          <Trash2 size={14} />
          {deleting ? "Deleting…" : "Delete Business"}
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="glass p-5 rounded-2xl flex items-center gap-4">
          <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center">
            <Users size={19} className="text-indigo-400" />
          </div>
          <div>
            <p className="text-[12.5px] text-[#9aa0b4]">Total Partners</p>
            <p className="text-xl font-semibold text-white tabular">
              {partners.length}
            </p>
          </div>
        </div>

        <div className="glass p-5 rounded-2xl flex items-center gap-4">
          <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center">
            <TrendingUp size={19} className="text-emerald-400" />
          </div>
          <div>
            <p className="text-[12.5px] text-[#9aa0b4]">Total Investment</p>
            <p className="text-xl font-semibold text-white tabular">
              {formatCurrency(totalInvestment)}
            </p>
          </div>
        </div>

        <div className="glass p-5 rounded-2xl flex items-center gap-4">
          <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center">
            <DollarSign size={19} className="text-amber-400" />
          </div>
          <div>
            <p className="text-[12.5px] text-[#9aa0b4]">Profit Entries</p>
            <p className="text-xl font-semibold text-white tabular">
              {profits.length}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-white/8 mb-6">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-[13.5px] font-medium border-b-2 transition-colors ${
              activeTab === tab
                ? "border-indigo-500 text-white"
                : "border-transparent text-[#8890a0] hover:text-[#c8cdd6]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ---- Overview Tab (Partners) ---- */}
      {activeTab === "Overview" && (
        <div className="glass p-5 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-white text-[14.5px]">Partners</h2>
            <button
              onClick={openPartnerModal}
              className="flex items-center gap-1 text-[13px] text-indigo-400 font-medium hover:text-indigo-300"
            >
              <Plus size={15} />
              Add Partner
            </button>
          </div>
          <PartnerTable partners={partners} onRemove={handleRemovePartner} />
        </div>
      )}

      {/* ---- Investments Tab ---- */}
      {activeTab === "Investments" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 glass p-5 rounded-2xl h-fit">
            <h2 className="font-semibold text-white text-[14.5px] mb-4">
              Add Investment
            </h2>
            {partners.length === 0 ? (
              <p className="text-[13px] text-[#5a6172]">
                Add a partner first before adding investments.
              </p>
            ) : (
              <InvestmentForm
                partners={partners}
                onSubmit={handleAddInvestment}
                loading={investmentFormLoading}
              />
            )}
          </div>

          <div className="lg:col-span-2 glass p-5 rounded-2xl">
            <h2 className="font-semibold text-white text-[14.5px] mb-4">
              All Investments — Total: {formatCurrency(totalInvestment)}
            </h2>
            <InvestmentTable investments={investments} />
          </div>
        </div>
      )}

      {/* ---- Profit Tab ---- */}
      {activeTab === "Profit" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 glass p-5 rounded-2xl h-fit">
            <h2 className="font-semibold text-white text-[14.5px] mb-4">
              Create Profit Entry
            </h2>

            {investments.length === 0 ? (
              <p className="text-[13px] text-[#5a6172]">
                Add investments first before distributing profit.
              </p>
            ) : (
              <form onSubmit={handleCreateProfit}>
                <Input
                  label="Total Amount"
                  type="number"
                  name="total_amount"
                  value={profitFormData.total_amount}
                  onChange={handleProfitChange}
                  placeholder="e.g. 2000"
                  required
                />

                <div className="mb-4">
                  <label className="block text-[13px] font-medium text-[#9aa0b4] mb-1.5">
                    Type
                  </label>
                  <select
                    name="type"
                    value={profitFormData.type}
                    onChange={handleProfitChange}
                    className="w-full px-3 py-2 bg-white/4 border border-white/8 rounded-lg text-[13.5px] text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="profit" className="bg-[#12151c]">
                      Profit
                    </option>
                    <option value="loss" className="bg-[#12151c]">
                      Loss
                    </option>
                  </select>
                </div>

                <Input
                  label="Remarks (optional)"
                  name="remarks"
                  value={profitFormData.remarks}
                  onChange={handleProfitChange}
                  placeholder="e.g. Q1 earnings"
                />

                <Button type="submit" loading={profitCreating}>
                  Create & Distribute
                </Button>
              </form>
            )}
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="glass p-5 rounded-2xl">
              <h2 className="font-semibold text-white text-[14.5px] mb-4">
                Profit History
              </h2>
              <div className="space-y-2">
                {profits.length === 0 && (
                  <p className="text-[13px] text-[#5a6172]">
                    No profit entries yet
                  </p>
                )}
                {profits.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handleViewProfitDetails(p.id)}
                    className="w-full flex items-center justify-between p-3 rounded-lg border border-white/6 hover:bg-white/4 text-left transition-colors"
                  >
                    <span className="text-[13px] text-[#c8cdd6] capitalize">
                      {p.type}
                    </span>
                    <span className="text-[13px] font-medium text-white tabular">
                      {formatCurrency(p.total_amount)}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {selectedProfit && (
              <div className="glass p-5 rounded-2xl">
                <h2 className="font-semibold text-white text-[14.5px] mb-4">
                  Distribution Breakdown
                </h2>
                <ProfitDistributionTable
                  distribution={selectedProfit.distribution}
                />
              </div>
            )}
          </div>
        </div>
      )}

      <Modal
        isOpen={partnerModalOpen}
        onClose={() => setPartnerModalOpen(false)}
        title="Add Partner"
      >
        <PartnerForm
          availableUsers={availableUsers}
          onSubmit={handleAddPartner}
          loading={partnerFormLoading}
        />
      </Modal>
    </DashboardLayout>
  );
};

export default BusinessDetails;