import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np


def process_raw():
    raw = pd.read_csv('creditcard.csv')
    print(raw.head())
    # print()
    df = pd.DataFrame()
    df['time'] = raw['Time'].values.tolist()
    df['amount'] = raw['Amount'].values.tolist()
    df.to_csv('transaction.csv', index=False, encoding='utf8')


# process_raw()
df = pd.read_csv('transaction.csv')
print(df.head(20))


def dist_plot():
    fig, ax = plt.subplots(1, 2, figsize=(18, 4))

    amount_val = df['amount'].values
    time_val = df['time'].values

    sns.distplot(amount_val, ax=ax[0], color='r')
    ax[0].set_title('Distribution of Transaction Amount', fontsize=14)
    ax[0].set_xlim([min(amount_val), max(amount_val)])

    sns.distplot(time_val, ax=ax[1], color='b')
    ax[1].set_title('Distribution of Transaction Time', fontsize=14)
    ax[1].set_xlim([min(time_val), max(time_val)])
    plt.savefig('raw_view.png')
    plt.show()

# dist_plot()


def amount_plot(data, edge):
    data = [x for x in data if x <= edge]
    fig, ax = plt.subplots()
    sns.distplot(data, ax=ax, color='r')
    ax.set_title(f"Distribution of Transaction Amount(edge={edge})", fontsize=14)
    ax.set_xlim([min(data), max(data)])
    plt.savefig(f'Dist_edge{edge}.png')
    plt.show()


amount = df['amount'].values
mean = np.mean(amount)
over = [x for x in amount if x >= 10*mean]
below = [x for x in amount if x <= mean]
sigma = np.sum([(x-mean)**2 for x in amount])/len(amount)
print(mean, len(over), len(below), sigma)
amount_plot(amount, 100)
