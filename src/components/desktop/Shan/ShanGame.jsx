import React, { useState, useEffect } from 'react';
import { Button, Spinner, Alert, Card } from 'react-bootstrap';
import shanImg from './assets/img/shan.jpg';

export default function ShanGame({ operator_code = "a3h1" }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [fetchingUser, setFetchingUser] = useState(true);

  useEffect(() => {
    // Fetch user info on mount
    setFetchingUser(true);
    fetch('https://luckymillion.pro/api/user', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        'Accept': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        setUser(data.data);
        setFetchingUser(false);
      })
      .catch(() => setFetchingUser(false));
  }, []);

  const handleLaunchGame = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await fetch('https://luckymillion.pro/api/shan-launch-game', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
          'Accept': 'application/json'
        },
        body: JSON.stringify({ member_account: user?.member_account || user?.user_name, operator_code })
      });
      const data = await response.json();
      if (data.status === 'success' && data.launch_game_url) {
        setSuccess('Game launched successfully!');
        window.open(data.launch_game_url, '_blank');
      } else if (data.status === 'fail' && data.errors && data.errors.operator_code) {
        setError(data.errors.operator_code.join(' '));
      } else {
        setError(data.message || data.error_detail || 'Failed to launch game.');
      }
    } catch (err) {
      setError('Network or server error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: 400 }}>
      <Card style={{ maxWidth: 400, width: '100%', position: 'relative' }} className="shadow p-4">
        {/* Spinner overlay during launch */}
        {loading && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(255,255,255,0.7)',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 12
          }}>
            <Spinner animation="border" style={{ width: 60, height: 60 }} />
          </div>
        )}
        <Card.Body>
          <div className="text-center mb-3">
            <img src={shanImg} alt="Shan Game" style={{ width: '100%', maxWidth: 220, borderRadius: 12, objectFit: 'cover', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }} />
          </div>
          <h2 className="text-center mb-4">Shan Game</h2>
          {fetchingUser ? (
            <div className="text-center my-4">
              <Spinner animation="border" />
              <div>Loading user info...</div>
            </div>
          ) : user ? (
            <>
              <div className="mb-3 text-center">
                <div><strong>Account:</strong> {user.member_account || user.user_name}</div>
                <div><strong>Balance:</strong> {user.balance ? parseFloat(user.balance).toLocaleString(undefined, { minimumFractionDigits: 2 }) : '0.00'}</div>
                <div><strong>Product Code:</strong> {operator_code}</div>
              </div>
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}
              <Button onClick={handleLaunchGame} disabled={loading} size="lg" className="w-100 mb-2">
                {loading ? <Spinner as="span" animation="border" size="sm" /> : 'Launch Shan Game'}
              </Button>
            </>
          ) : (
            <Alert variant="danger">Failed to load user info. Please log in again.</Alert>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}
